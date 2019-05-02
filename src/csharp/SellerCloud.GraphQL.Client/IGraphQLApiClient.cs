using SellerCloud.GraphQL.Client.Models;
using SellerCloud.Net.Http.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SellerCloud.GraphQL.Client
{
    public interface IGraphQLApiClient
    {
        void AuthorizeWith(AuthToken token);

        Task<AuthToken> TokenAsync(string username, string password);

        Task<IDictionary<string, object>> Query(string query, object variables = null);

        Task<IDictionary<string, object>> Query(QueryRequest request);

        Task<dynamic> QueryDynamic(string query, object variables = null);

        Task<dynamic> QueryDynamic(QueryRequest request);

        Task<T> Query<T>(string query, object variables = null);

        Task<T> Query<T>(QueryRequest request);

        Task<QueryResponse<T>> RawQuery<T>(QueryRequest request);

        AuthToken AuthToken { get; }
    }
}