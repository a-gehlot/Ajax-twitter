class TweetsController < ApplicationController
  before_action :require_logged_in!, except: :index
  

  def create
    # simulate latency
    sleep(1)

    @tweet = current_user.tweets.build(tweet_params)

    if @tweet.save
      respond_to do |format|
        format.json {render :show}
        format.html {redirect_to request.referrer}
      end
    else
      # Lazy: even respond with JSON to invalid HTML request.
      render json: @tweet.errors.full_messages, status: 422
    end
  end

  def index
    @tweets = Tweet.all
    render :index
  end

  private
  def tweet_params
    params.require(:tweet).permit(:content, mentioned_user_ids: [])
  end
end
