using StudentManager.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace StudentManager.Controllers
{
    public class GenreController : ApiController
    {
        private LinqDataContext db = new LinqDataContext();

        [HttpGet]
        [Route("api/v1/genre")]
        public ResponseBase<List<Genre>> GetList()
        {
            try
            {
                return new ResponseBase<List<Genre>>
                {
                    data = db.Genres.ToList(),
                    status = 200,
                    message = "Success"
                };
            }
            catch (Exception ex)
            {
                return new ResponseBase<List<Genre>>
                {
                    message = ex.ToString(),
                    status = 500
                };
            }
        }

        [HttpPost, Route("api/v1/genre")]
        public ResponseBase<bool> Save(Genre req)
        {
            try
            {
                db.Genres.InsertOnSubmit(req);
                db.SubmitChanges();
                return new ResponseBase<bool>
                {
                    data = true,
                    status = 200,
                    message = "Success"
                };
            }
            catch (Exception ex)
            {
                return new ResponseBase<bool>
                {
                    message = ex.ToString(),
                    status = 500
                };
            }
        }

        [HttpDelete, Route("api/v1/genre")]
        public ResponseBase<bool> Delete(int id = 0)
        {
            try
            {
                var _genre = db.Genres.FirstOrDefault(x => x.GenreId == id);
                db.Genres.DeleteOnSubmit(_genre);
                db.SubmitChanges();
                return new ResponseBase<bool>
                {
                    data = true,
                    status = 200,
                    message = "Success"
                };
            }
            catch (Exception ex)
            {
                return new ResponseBase<bool>
                {
                    message = ex.ToString(),
                    status = 500
                };
            }
        }
    }
}