using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
  public class List
  {
    public class Query : IRequest<List<Activity>> { }

    public class Handler : IRequestHandler<Query, List<Activity>>
    {
      private readonly DataContext _context;

      public Handler(DataContext context)
      {
        _context = context;
      }
      public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
      {
        //cancellationToken allow you to stop the request to go through 
        return await _context.Activities.ToListAsync();
      }
    }
  }
}