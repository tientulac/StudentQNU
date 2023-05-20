using StudentManager.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace StudentManager.Controllers
{
    public class MajorController : ApiController
    {
        private LinqDataContext db = new LinqDataContext();

        [HttpGet]
        [Route("api/v1/major")]
        public ResponseBase<List<Major>> GetList()
        {
            try
            {
                return new ResponseBase<List<Major>>
                {
                    data = db.Majors.ToList(),
                    status = 200,
                    message = "Success"
                };
            }
            catch (Exception ex)
            {
                return new ResponseBase<List<Major>>
                {
                    message = ex.ToString(),
                    status = 500
                };
            }
        }

        [HttpPost, Route("api/v1/major")]
        public ResponseBase<bool> Save(Major req)
        {
            try
            {
                db.Majors.InsertOnSubmit(req);
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

        [HttpDelete, Route("api/v1/major")]
        public ResponseBase<bool> Delete(int id = 0)
        {
            try
            {
                var _major = db.Majors.FirstOrDefault(x => x.MajorId == id);
                db.Majors.DeleteOnSubmit(_major);
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