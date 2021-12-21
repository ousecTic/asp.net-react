using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
  public class Create
  {
    public class Command : IRequest
    {
      public Activity Activity { get; set; }
    }


    public class Handler : IRequestHandler<Command>
    {
      private readonly DataContext _context;
      public Handler(DataContext context)
      {
        _context = context;
      }


      //unit returns nothing
      public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
      {

        //activity in memory
        _context.Activities.Add(request.Activity);

        await _context.SaveChangesAsync();

        //tell the api controller that we finish
        return Unit.Value;
      }
    }
  }
}