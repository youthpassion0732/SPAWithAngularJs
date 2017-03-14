using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SPAWithAngularJs
{
    public class CustomersController : ApiController
    {
        // GET api/Customers
        public IEnumerable<Customer> Get()
        {
            CustomerContext dbContext = new CustomerContext();
            return dbContext.Customers.ToList();
        }

        // GET api/Customers/5
        public Customer Get(int id)
        {
            CustomerContext dbContext = new CustomerContext();
            return dbContext.Customers.Find(id);
        }

        // POST api/Customers
        public void Post([FromBody]Customer customer)
        {
            CustomerContext dbContext = new CustomerContext();
            dbContext.Customers.Add(customer);
            dbContext.SaveChanges();
        }

        // PUT api/Customers/5
        public void Put(int id, [FromBody]Customer customer)
        {
            CustomerContext dbContext = new CustomerContext();          
            Customer customerToUpdate = dbContext.Customers.Find(id);
            customerToUpdate.FirstName = customer.FirstName;
            customerToUpdate.LastName = customer.LastName;
            customerToUpdate.PhoneNumber = customer.PhoneNumber;
            customerToUpdate.Country = customer.Country;
            customerToUpdate.State = customer.State;
            customerToUpdate.StreetAddress = customer.StreetAddress;

            dbContext.Entry(customerToUpdate).State = System.Data.Entity.EntityState.Modified;
            dbContext.SaveChanges();
        }

        // DELETE api/Customers/5
        public void Delete(int id)
        {
            CustomerContext dbContext = new CustomerContext();
            Customer customer = dbContext.Customers.Find(id);
            dbContext.Customers.Remove(customer);
            dbContext.SaveChanges();
        }

    }
}
