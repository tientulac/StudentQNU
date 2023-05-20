using StudentManager.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Web;
using System.Web.Http;

namespace StudentManager.Controllers
{
    public class AccountController : ApiController
    {
        private LinqDataContext db = new LinqDataContext();

        [HttpGet]
        [Route("api/v1/account")]
        public ResponseBase<List<Account>> GetList()
        {
            try
            {
                return new ResponseBase<List<Account>>
                {
                    data = db.Accounts.ToList(),
                    status = 200,
                    message = "Success"
                };
            }
            catch (Exception ex)
            {
                return new ResponseBase<List<Account>>
                {
                    message = ex.ToString(),
                    status = 500
                };
            }
        }

        [HttpGet]
        [Route("api/v1/account/findbyid/{id}")]
        public ResponseBase<Account> FindById(int id = 0)
        {
            try
            {
                return new ResponseBase<Account>
                {
                    data = db.Accounts.Where(x => x.AccountId == id).FirstOrDefault(),
                    status = 200,
                    message = "Success"
                };
            }
            catch (Exception ex)
            {
                return new ResponseBase<Account>
                {
                    message = ex.ToString(),
                    status = 500
                };
            }
        }

        [HttpDelete]
        [Route("api/v1/account/{id}")]
        public ResponseBase<bool> Delete(int id = 0)
        {
            try
            {
                var acc = db.Accounts.Where(x => x.AccountId == id).FirstOrDefault();
                db.Accounts.DeleteOnSubmit(acc);
                db.SubmitChanges();
                return new ResponseBase<bool>
                {
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

        [HttpPost]
        [Route("api/v1/account")]
        public ResponseBase<Account> Save(Account req)
        {
            try
            {
                if (req.AccountId > 0)
                {
                    var acc = db.Accounts.Where(x => x.AccountId == req.AccountId).FirstOrDefault();
                    acc.UpdatedAt = DateTime.Now;
                    acc.RoleCode = req.RoleCode;
                    acc.Type = req.Type;
                    acc.Status = req.Status;
                    acc.Admin = req.Admin;
                    acc.Active = req.Active;
                    db.SubmitChanges();
                }
                else
                {
                    req.CreatedAt = DateTime.Now;
                    db.Accounts.InsertOnSubmit(req);
                    db.SubmitChanges();
                }
                return new ResponseBase<Account>
                {
                    data = req,
                    status = 200,
                    message = "Success"
                };
            }
            catch (Exception ex)
            {
                return new ResponseBase<Account>
                {
                    message = ex.ToString(),
                    status = 500
                };
            }
        }

        [HttpPost]
        [Route("api/v1/account/login")]
        public ResponseBase<AccountDTO> Login(Account req)
        {
            try
            {
                var acc = db.Accounts.Where(x => x.UserName == req.UserName && x.Password == req.Password).FirstOrDefault();
                var accDTO = new AccountDTO() {
                    Account = acc,
                    Token = createToken(acc.UserName)
                };
                if (acc.AccountId > 0)
                {
                    return new ResponseBase<AccountDTO>
                    {
                        data = accDTO,
                        status = 200
                    };
                }
                else
                {
                    return new ResponseBase<AccountDTO>
                    {
                        message = "Login faild",
                        status = 500
                    };
                }
            }
            catch (Exception ex)
            {
                return new ResponseBase<AccountDTO>
                {
                    status = 500,
                    message = ex.ToString()
                };
            }
        }

        public static string createToken(string Username)
        {
            DateTime issuedAt = DateTime.UtcNow;
            DateTime expires = DateTime.UtcNow.AddDays(10);
            //http://stackoverflow.com/questions/18223868/how-to-encrypt-jwt-security-token
            var tokenHandler = new JwtSecurityTokenHandler();
            string sec = "088881139703564148785088881139703564148785088881139703564148785";
            var securityKey = new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(System.Text.Encoding.Default.GetBytes(sec));
            var signingCredentials = new Microsoft.IdentityModel.Tokens.SigningCredentials(securityKey, Microsoft.IdentityModel.Tokens.SecurityAlgorithms.HmacSha256Signature);
            //create the jwt
            var token =
                (JwtSecurityToken)
                    tokenHandler.CreateJwtSecurityToken(issuer: "SutdentManagement", audience: "SutdentManagement",
                        subject: null, notBefore: issuedAt, expires: expires, signingCredentials: signingCredentials);
            var tokenString = tokenHandler.WriteToken(token);

            return tokenString;
        }
    }
}