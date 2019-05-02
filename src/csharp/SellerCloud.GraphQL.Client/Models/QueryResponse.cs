using System.Collections.Generic;

namespace SellerCloud.GraphQL.Client.Models
{
    public class QueryResponse<T>
    {
        public T data { get; set; }
        public IEnumerable<string> errors { get; set; }
    }
}
