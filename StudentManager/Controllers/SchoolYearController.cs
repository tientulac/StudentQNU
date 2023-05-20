using StudentManager.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace StudentManager.Controllers
{
    public class SchoolYearController : ApiController
    {
        private LinqDataContext db = new LinqDataContext();

        [HttpGet]
        [Route("api/v1/school-year")]
        public ResponseBase<List<SchoolYear>> GetList()
        {
            try
            {
                return new ResponseBase<List<SchoolYear>>
                {
                    data = db.SchoolYears.ToList(),
                    status = 200,
                    message = "Success"
                };
            }
            catch (Exception ex)
            {
                return new ResponseBase<List<SchoolYear>>
                {
                    message = ex.ToString(),
                    status = 500
                };
            }
        }

        [HttpPost, Route("api/v1/school-year")]
        public ResponseBase<bool> Save(SchoolYear req)
        {
            try
            {
                db.SchoolYears.InsertOnSubmit(req);
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

        [HttpDelete, Route("api/v1/school-year")]
        public ResponseBase<bool> Delete(int id = 0)
        {
            try
            {
                var _schoolyear = db.SchoolYears.FirstOrDefault(x => x.SchoolYearId == id);
                db.SchoolYears.DeleteOnSubmit(_schoolyear);
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