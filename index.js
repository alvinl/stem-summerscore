
module.exports = function (Stem) {

  /**
   * Dependencies
   */
  
  var request = require('request').defaults({ json: true });

  /**
   * Team names
   * @type {Object}
   */
  var teams = {

    '1': 'Red Team',
    '2': 'Blue Team',
    '3': 'Pink Team',
    '4': 'Green Team',
    '5': 'Purple Team'

  };
  
  // Register `score` as a admin command
  Stem.api.addCommand('score', function (steamID) {
    
    // Fetch the current team scores
    request('http://store.steampowered.com/promotion/summer2014teamscoreajax', function (err, response, body) {
        
      if (err || response.statusCode !== 200)
        return Stem.bot.sendMessage(steamID, 'Error fetching team scores');

      var sortedTeams = [];

      for (var team in body)
        sortedTeams.push([team, body[team]]);

      // Sort the teams by score
      sortedTeams.sort(function (a, b) {
        
        return b[1] - a[1];

      });

      // Message the user each teams score
      sortedTeams.forEach(function (teamInfo) {

        Stem.bot.sendMessage(steamID, teamInfo[1].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + 
                                      ' - ' + 
                                      teams[teamInfo[0]]);

      });

    });

  }, 1);

};