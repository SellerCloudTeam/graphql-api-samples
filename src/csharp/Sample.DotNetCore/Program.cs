using Newtonsoft.Json;
using Sample.DotNetCore.QueryModels;
using SellerCloud.GraphQL.Client;
using SellerCloud.Net.Http.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Sample.DotNetCore
{
    class Program
    {
        // TODO: Enter your SellerCloud server ID or API server URL here
        //       e.g. https://<server-id>.api.sellercloud.com/gql
        const string GRAPHQL_SERVER = your_graphql_url;

        // TODO: Enter your SellerCloud credentials here
        const string SELLERCLOUD_USERNAME = your_email_address;
        const string SELLERCLOUD_PASSWORD = your_password;

        static async Task Main()
        {
            IGraphQLApiClient client = new GraphQLApiClient(GRAPHQL_SERVER);
            AuthToken token = await client.TokenAsync(SELLERCLOUD_USERNAME, SELLERCLOUD_PASSWORD);

            client.AuthorizeWith(token);

            // Examples with { viewer { ... } } query
            // (using typed query, and using dynamic)
            await TypedQueryExampleViewer(client);
            await DynamicExampleViewer(client);

            // Example with { products { ... } } query
            await ExampleProducts(client);

            // Example with variables (as anonymous type!)
            // Example with variables (as key-value pairs)
            await VariablesExampleWithAnonymousType(client);
            await VariablesExampleWithKeyValuePairs(client);
        }

        static async Task TypedQueryExampleViewer(IGraphQLApiClient client)
        {
            ViewerQuery result = await client.Query<ViewerQuery>(@"{ viewer { id email } }");
            Viewer viewer = result.Viewer;

            Console.WriteLine($"(From typed query) Viewer is {viewer.Id} with email {viewer.Email}");
            Console.WriteLine();
        }

        static async Task DynamicExampleViewer(IGraphQLApiClient client)
        {
            dynamic result = await client.QueryDynamic(@"{ viewer { id email firstName lastName } }");
            dynamic viewer = result.viewer;

            Console.WriteLine($"(From dynamic) Viewer is {viewer.firstName} {viewer.lastName}");
            Console.WriteLine();
        }

        static async Task ExampleProducts(IGraphQLApiClient client)
        {
            var companies = await client.Query(@"{ products { id longDescription } }");

            DumpResult(companies);
        }

        static async Task VariablesExampleWithAnonymousType(IGraphQLApiClient client)
        {
            var query =
                @"query ($count: Int!)
                  {
                      orders ( paging: { count: $count } )
                      {
                          id
                          company { name }
                      }
                  }";

            var fiveOrders = await client.Query(query, new { count = 5 });

            DumpResult(fiveOrders);
        }

        static async Task VariablesExampleWithKeyValuePairs(IGraphQLApiClient client)
        {
            var query =
                @"query ($count: Int!)
                  {
                      orders ( paging: { count: $count } )
                      {
                          id
                          company { name }
                      }
                  }";

            var vars = new Dictionary<string, object>
            {
                ["count"] = 2
            };

            var twoOrders = await client.Query(query, vars);

            DumpResult(twoOrders);
        }

        static void DumpResult<T>(T data)
        {
            string json = JsonConvert.SerializeObject(data, Formatting.Indented);

            Console.WriteLine(json);
            Console.WriteLine();
        }
    }
}
