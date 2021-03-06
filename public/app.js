function fetchAndVisualizeData() {
  fetch("./data.json")
    .then(r => r.json())
    .then(visualizeData);
}

fetchAndVisualizeData();

function visualizeData(data) 
{
  visualizeMatchesPlayedPerYear(data.matchesPlayedPerYear);
  visualizeMatchesWonByEachTeam(data.matchesWonByEachTeam);
  visualizeExtraRuns(data.extraRuns)
  visualizeEconomyBowlers(data.economyBowlers[2015])
  visualizeStadiums(data.stadiums)
  return;
}



function visualizeMatchesPlayedPerYear(matchesPlayedPerYear) 
{
  const seriesData = [];
  for (let year in matchesPlayedPerYear) 
  {
    seriesData.push([year, matchesPlayedPerYear[year]]);
  }
  //console.log(seriesData)

  Highcharts.chart("matches-played-per-year", {
   chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
      text: "(i) Total no. of matches played per year" 
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      type: "category"
    },
    yAxis: {
      min: 0,
      title: {
        text: "Matches"
      }
    },
     tooltip: {
        pointFormat: 'Matches: <b>{point.y:1f} </b>'
    },
    series: [
      {
        name: "Years",
        data: seriesData
      }
    ]
  });
}

function visualizeMatchesWonByEachTeam(data)
{
    const series = []
    let year = Object.keys(data)
    const team = []
    for(let i=0;i<year.length;i++)
    {    
      team.push(Object.keys(data[year[i]]))
    }
    const teams=[...new Set([].concat.apply([], team))]
    //console.log(teams)
    for(let i in teams)
    {
      let total=[]
      for(let j in year)
      {
        if(data[year[j]].hasOwnProperty(teams[i]))
        {
          total.push(data[year[j]][teams[i]])
        }
        else{
          total.push(0)
        }
      }
      series.push({name: teams[i], data: total})
    }
    //console.log(series)
    //return series

    Highcharts.chart('matches-won-by-each-team', {
      chart: {
          type: 'column'
      },
      title: {
          text: ' (ii) No. of matches won by each team over all the years of IPL'
      },
      subtitle: {
          text: 'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
      },
      xAxis: {
          categories: year,
          crosshair: true
      },
      yAxis: {
          min: 0,
          title: {
              text: 'Matches won'
          }
      },
      tooltip: {
          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
              '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true
      },
      plotOptions: {
          column: {
              pointPadding: 0.2,
              borderWidth: 0
          }
      },
      series: series
    });
}

function visualizeExtraRuns(data)
{
  const seriesData = [];
  for (let i in data) 
  {
    seriesData.push([i, data[i]]);
  }
  //console.log(seriesData)

var chart =  Highcharts.chart("extra-runs", {
    chart: {
      type: "column"
    },
    title: {
      text: " (iii) Extra runs conceded by each team in 2016"
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      type: "category"
    },
    yAxis: {
      min: 0,
      title: {
        text: "Extra runs"
      }
    },
    tooltip: {
      pointFormat: 'Extra Runs: <b>{point.y:1f} </b>'
    },
    series: [
      {
        type: 'column',
        name: 'team',
        colorByPoint: true,    
        data: seriesData,
        showInLegend: false
      }
    ]
  });


$('#plain').click(function () {
    chart.update({
        chart: {
            inverted: false,
            polar: false
        },
        subtitle: {
            text: 'Plain'
        }
    });
});

$('#inverted').click(function () {
    chart.update({
        chart: {
            inverted: true,
            polar: false
        },
        subtitle: {
            text: 'Inverted'
        }
    });
});

$('#polar').click(function () {
    chart.update({
        chart: {
            inverted: false,
            polar: true
        },
        subtitle: {
            text: 'Polar'
        }
    });
});

}



function visualizeEconomyBowlers(data)
{
  Highcharts.chart("economy-bowlers", {
    chart: {
      type: "column"
    },
    title: {
      text: "(iv) Top 10 Economical Bowlers in 2015"
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      type: "category"
    },
    yAxis: {
      min: 0,
      title: {
        text: "Economy"
      }
    },
   tooltip: {
      pointFormat: 'Economy: <b>{point.y:1f} </b>'
   },
    series: [
      {
        name: "Bowlers",
        data: data
      }
    ]
  });
}



function visualizeStadiums(data)
{
  //console.log(data)
  const series = []
  let stadium = Object.keys(data)
  //console.log(stadium)
  const team = []
  for(let i=0;i<stadium.length;i++)
  {    
    team.push(Object.keys(data[stadium[i]]))
  }
  const teams=[...new Set([].concat.apply([], team))]
  //console.log(teams)
  for(let i in teams)
  {
    let total=[]
    for(let j in stadium)
    {
      if(data[stadium[j]].hasOwnProperty(teams[i]))
      {
        total.push(data[stadium[j]][teams[i]])
      }
      else{
        total.push(0)
      }
    }
    series.push({name: teams[i], data: total})
  }
  //console.log(series)
  //return series

      Highcharts.chart('stadiums', {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Story: Matches won by each team per Stadium'
        },
        xAxis: {
            categories: stadium
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Matches won vs Stadium'
            }
        },
        legend: {
            reversed: true
        },
        plotOptions: {
            series: {
                stacking: 'normal'
            }
        },
        series: series
    });
}