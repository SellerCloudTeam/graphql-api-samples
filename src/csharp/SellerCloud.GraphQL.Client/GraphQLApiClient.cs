using SellerCloud.GraphQL.Client.Models;
using SellerCloud.Net.Http.Api;
using SellerCloud.Net.Http.Models;
using SellerCloud.Results;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;

namespace SellerCloud.GraphQL.Client
{
    public class GraphQLApiClient : IGraphQLApiClient
    {
        const string GRAPHQL_ENDPOINT = "/graphql";
        const string TOKEN_ENDPOINT = "/token";

        private readonly IHttpApiClient client;
        private AuthToken authToken;

        public GraphQLApiClient(string baseUri)
        {
            this.client = new HttpApiClient(baseUri);
        }

        public GraphQLApiClient(HttpClient httpClient, string baseUri)
        {
            this.client = new HttpApiClient(httpClient, baseUri);
        }

        public AuthToken AuthToken => this.authToken;

        public void AuthorizeWith(AuthToken token)
        {
            this.authToken = token;
        }

        public async Task<AuthToken> TokenAsync(string username, string password)
        {
            var request = new TokenRequest
            {
                username = username,
                password = password
            };

            var response = await this.client.HttpPost(TOKEN_ENDPOINT, request)
                                            .Result<TokenResponse>()
                                            .ResolveOrThrow();

            var token = new AuthToken(response.token_type, response.access_token);

            return token;
        }

        public Task<IDictionary<string, object>> Query(string query, object variables = null)
        {
            return this.Query<IDictionary<string, object>>(query, variables);
        }

        public Task<IDictionary<string, object>> Query(QueryRequest request)
        {
            return this.Query<IDictionary<string, object>>(request);
        }

        public Task<dynamic> QueryDynamic(string query, object variables = null)
        {
            return this.Query<dynamic>(query, variables);
        }

        public Task<dynamic> QueryDynamic(QueryRequest request)
        {
            return this.Query<dynamic>(request);
        }

        public Task<T> Query<T>(string query, object variables = null)
        {
            return this.Query<T>(new QueryRequest { query = query, variables = variables });
        }

        public async Task<T> Query<T>(QueryRequest request)
        {
            var response = await this.client.HttpPost(GRAPHQL_ENDPOINT, request)
                                            .AuthorizeWith(this.authToken)
                                            .Result<QueryResponse<T>>()
                                            .ResolveOrThrow();

            this.ThrowIfUnsuccessful(response.errors);

            return response.data;
        }

        public async Task<QueryResponse<T>> RawQuery<T>(QueryRequest request)
        {
            var response = await this.client.HttpPost(GRAPHQL_ENDPOINT, request)
                                            .AuthorizeWith(this.authToken)
                                            .Result<QueryResponse<T>>()
                                            .ResolveOrThrow();

            return response;
        }

        private void ThrowIfUnsuccessful(IEnumerable<string> errors)
        {
            if (errors == null) return;

            string collected = string.Join(Environment.NewLine, errors);

            throw new ApplicationException(collected);
        }
    }
}
