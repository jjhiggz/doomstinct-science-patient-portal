defmodule ChatServer.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      ChatServerWeb.Telemetry,
      ChatServer.Repo,
      {DNSCluster, query: Application.get_env(:chat_server, :dns_cluster_query) || :ignore},
      {Phoenix.PubSub, name: ChatServer.PubSub},
      # Start the Finch HTTP client for sending emails
      {Finch, name: ChatServer.Finch},
      # Start a worker by calling: ChatServer.Worker.start_link(arg)
      # {ChatServer.Worker, arg},
      # Start to serve requests, typically the last entry
      ChatServerWeb.Endpoint
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: ChatServer.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    ChatServerWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
