namespace SellerCloud.GraphQL.Client.Models
{
    public class QueryRequest
    {
        public string query { get; set; }
        public object variables { get; set; }
        public string operationName { get; set; }
    }
}
