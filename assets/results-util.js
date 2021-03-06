// Sentiment
function get_and_load_sentiment(sentiment_params) {
  var positive_tweets = [];
  var negative_tweets = [];
  var neutral_tweets = [];
  $.ajax({
  url: 'https://cors-anywhere.herokuapp.com/https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment',
  method: 'post',
  data: JSON.stringify(sentiment_params),
  headers: {
    'Ocp-Apim-Subscription-Key': '19f499222da04bae8d23c6416c42c56b',
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  success: function(reply2){
    var num_pos = 0;
    var num_neg = 0;
    var num_neutral = 0;
    var score = 0;
    console.log("reply2");
    console.log(reply2);
    reply2['documents'].forEach(function(e) {
      score += e['score'];
      if (e['score'] < 0.5) {
        num_neg += 1;
        negative_tweets.push(e);
      } else if (e['score'] == 0.5) {
        num_neutral += 1;
        neutral_tweets.push(e);
      } else {
        num_pos += 1;
        positive_tweets.push(e);
      }
    });
    var ctx = $("#myChart");
    var data = {
      datasets: [{
          label: "Analysis Results",
          data: [num_pos, num_neg, num_neutral],
          backgroundColor:["rgb(0, 255, 0)", "rgb(255, 99, 132)", "rgb(54, 162, 235)"]
      }],

      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: [
          'Positive',
          'Negative',
          'Neutral'
      ]
  };
    var myPieChart = new Chart(ctx,{
      type: 'doughnut',
      data: data,
      options: {
        layout: {padding: 0},
        title: {display: true, text: "Sentiment Proportions", fontSize: 32, fontColor: '#FFF', fontFamily: 'Bree Serif', padding: 20},
        legend: {labels: {fontColor: '#FFF', fontFamily: 'Bree Serif', fontSize: 16}}
      }
    });

    positive_tweets.sort(function(a, b) {
      return b['score'] - a['score'];
    });
    negative_tweets.sort(function(a, b) {
      return a['score'] - b['score'];
    });

    $('#num-positive').append(positive_tweets.length + ' Positive Tweets');
    $('#num-negative').append(negative_tweets.length + ' Negative Tweets');
    $('#num-neutral').append(neutral_tweets.length + ' Neutral Tweets');
    $('#sentiment-score').append("Overall Positivity Score: " + Math.round(score * 100 / reply2['documents'].length * 100) / 100 + "%");

    for (var i = 0; i < positive_tweets.length; ++i) {
      var e = positive_tweets[i];
      $('#positive-tweets').append('<div id="tweet' + e['id'] + '-container" class="text-center bree">  </div>');
      var tweet_container = $('#tweet' + e['id'] + '-container');
      tweet_container.append('<div id="tweet' + e['id'] + '"></div><br />');
      var tweet = document.getElementById("tweet" + e['id']);
      console.log(tweet);
      var id = e['id'];

      twttr.widgets.createTweet(
        id, tweet, 
        {
          conversation : 'none',    // or all
          cards        : 'hidden',  // or visible 
          linkColor:     '#f9953e',
          theme        : 'light',    // or dark
          width: 550
        })
      .then (function (el) {
      });
      tweet_container.prepend('Positivity: ' + Math.round(e['score'] * 100 * 100) / 100 + "%" );
    }

    for (var i = 0; i < negative_tweets.length; ++i) {
      var e = negative_tweets[i];
      $('#negative-tweets').append('<div id="tweet' + e['id'] + '-container" class="text-center bree">  </div>');
      var tweet_container = $('#tweet' + e['id'] + '-container');
      tweet_container.append('<div id="tweet' + e['id'] + '"></div><br />');
      var tweet = document.getElementById("tweet" + e['id']);
      console.log(tweet);
      var id = e['id'];

      twttr.widgets.createTweet(
        id, tweet, 
        {
          conversation : 'none',    // or all
          cards        : 'hidden',  // or visible 
          linkColor:     '#f9953e',
          theme        : 'light',    // or dark
          width: 550
        })
      .then (function (el) {
      });
      tweet_container.prepend('Positivity: ' + Math.round(e['score'] * 100 * 100) / 100 + "%" );
    }

    for (var i = 0; i < neutral_tweets.length; ++i) {
      var e = neutral_tweets[i];
      $('#neutral-tweets').append('<div id="tweet' + e['id'] + '-container" class="text-center bree">  </div>');
      var tweet_container = $('#tweet' + e['id'] + '-container');
      tweet_container.append('<div id="tweet' + e['id'] + '"></div><br />');
      var tweet = document.getElementById("tweet" + e['id']);
      console.log(tweet);
      var id = e['id'];

      twttr.widgets.createTweet(
        id, tweet, 
        {
          conversation : 'none',    // or all
          cards        : 'hidden',  // or visible 
          linkColor:     '#f9953e',
          theme        : 'light',    // or dark
          width: 550
        })
      .then (function (el) {
      });
      tweet_container.prepend('Positivity: ' + Math.round(e['score'] * 100 * 100) / 100 + "%" );
    }

    $("#results-loading").fadeOut(function() {
      $("#results-content").fadeIn();
    });
  }});
  
}

