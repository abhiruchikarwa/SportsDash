package localhostServer.server.models;

import java.util.List;

public class TeamWrapper {

    List<Team> teamList;
    
    public TeamWrapper() {
    }

    public TeamWrapper(List<Team> teamList) {
        this.teamList = teamList;
    }

    public List<Team> getTeamList() {
        return teamList;
    }

    public void setTeamList(List<Team> teamList) {
        this.teamList = teamList;
    }
}
