using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using System.IdentityModel.Tokens.Jwt;
using server.Helpers;
using Microsoft.Extensions.Options;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using server.Services;
using server.Dtos;
using server.Entities;

namespace server.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("[controller]")]
    public class CuttersController : ControllerBase
    {
        private ICutterService _cutterService;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;

        public CuttersController(
            ICutterService cutterService,
            IMapper mapper,
            IOptions<AppSettings> appSettings)
        {
            _cutterService = cutterService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }

        [HttpGet("/getAllCutters")]
        public IActionResult GetAll()
        {
            var cutters = _cutterService.GetAll();
            var cutterDtos = _mapper.Map<IList<CutterDto>>(cutters);
            return Ok(cutterDtos);
        }

        [HttpGet("/getCutterById")]
        public IActionResult GetById(int id)
        {
            var cutter = _cutterService.GetById(id);
            var cutterDto = _mapper.Map<CutterDto>(cutter);
            return Ok(cutterDto);
        }

        [HttpGet("/getCutterByIdSQL")]
        public IActionResult GetByIdSQL(int id)
        {
            var cutter = _cutterService.GetByIdSQL(id);
            var cutterDto = _mapper.Map<CutterDto>(cutter);
            return Ok(cutterDto);
        }

        [HttpGet("/getMachineInfo")]
        public IActionResult GetMachineInfo(string start, string end)
        {
            var cutter = _cutterService.GetMachineInfo(start, end);
            return Ok(cutter);
        }
    }
}