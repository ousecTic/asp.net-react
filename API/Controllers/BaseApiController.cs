using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  [ApiController]
  [Route("/api/[controller]")]
  public class BaseApiController : ControllerBase
  {
    private IMediator _mediator;

    //avaliable to derive classes
    protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();
  }
}