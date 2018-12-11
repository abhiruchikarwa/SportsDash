package localhostServer.server.models;

import java.util.List;

public class PlayerWrapper {

    List<Player> playerList;

    public PlayerWrapper() {
    }

    public PlayerWrapper(List<Player> playerList) {
        this.playerList = playerList;
    }

    public List<Player> getPlayerList() {
        return playerList;
    }

    public void setPlayerList(List<Player> playerList) {
        this.playerList = playerList;
    }
}
