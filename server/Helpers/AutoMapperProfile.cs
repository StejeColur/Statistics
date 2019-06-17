using AutoMapper;
using server.Dtos;
using server.Entities;

namespace server.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Cutter, CutterDto>();
            CreateMap<CutterDto, Cutter>();
        }
    }
}