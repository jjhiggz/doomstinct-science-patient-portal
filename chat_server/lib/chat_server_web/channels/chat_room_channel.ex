defmodule ChatServerWeb.ChatRoomChannel do
  use ChatServerWeb, :channel

  @impl true
  def join("chat_room:" <> room_id, payload, socket) do
    IO.inspect("Joined #{room_id}")

    if authorized?(payload) do
      {:ok, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  @impl true
  def handle_in("ping", payload, socket) do
    IO.inspect("pinging")
    {:reply, {:ok, payload}, socket}
  end

  def handle_in("message", payload, socket) do
    broadcast!(socket, "message", payload)
    {:noreply, socket}
  end

  def handle_in("user-typing", payload, socket) do
    broadcast!(socket, "user-typing", payload)
    {:noreply, socket}
  end

  def handle_in("user-typing-stop", payload, socket) do
    broadcast!(socket, "user-typing-stop", payload)
    {:noreply, socket}
  end

  def handle_in("SCREAM", payload, socket) do
    broadcast!(socket, "notification", %{message: "HOLY SHIT 💩"})
    {:noreply, socket}
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (chat_room:lobby).
  @impl true
  def handle_in("shout", payload, socket) do
    broadcast(socket, "shout", payload)
    {:noreply, socket}
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
