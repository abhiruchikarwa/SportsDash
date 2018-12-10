import React, {Component} from 'react'
import '../styles/search-bar.style.client.css'
import {withRouter} from 'react-router-dom'
import queryString from "query-string";
import $ from "jquery";

class SearchBar extends Component {
    constructor(props) {
        super(props);

        let filter = "Filter By";
        let searchText = "";
        if (props.location.search) {
            const values = queryString.parse(props.location.search);
            filter = values.filter || "";
            searchText = values.term || "";
        }
        this.state = {
            filter: filter,
            searchText: searchText
        };
        this.handleSearchText = this.handleSearchText.bind(this);
    }

    handleSearchText = (event) => this.setState({
        searchText: event.target.value
    });

    teamFilter = () => this.setState({
        filter: "Teams"
    });

    playerFilter = () => this.setState({
        filter: "Players"
    });

    venueFilter = () => this.setState({
        filter: "Venues"
    });

    searchResults = () => {
        if (this.state.filter !== "Filter By" && this.state.searchText !== "") {
            this.props.history.push("/search?filter=" + this.state.filter + "&term=" + this.state.searchText)
        }
        else {
            $(".alert").show()
        }
    };

    render() {
        return (
            <div>
                <div className="alert alert-danger alert-dismissible collapse" role="alert">
                    Please select a <strong>Filter</strong> and enter a <strong>Search Term</strong> to search
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="input-group md-form form-sm">
                    <div className="dropdown">
                        <button className="btn dropdown-toggle drop-menu" type="button" id="dropdownMenuButton"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {this.state.filter}
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <span className="dropdown-item" onClick={() => this.teamFilter()}>Teams</span>
                            <span className="dropdown-item" onClick={() => this.playerFilter()}>Players</span>
                            <span className="dropdown-item" onClick={() => this.venueFilter()}>Venues</span>
                        </div>
                    </div>
                    <input className="form-control search-bar-area" type="text" placeholder="Search"
                           onChange={this.handleSearchText}
                           value={this.state.searchText}
                           aria-label="Search"/>
                    <div className="input-group-append ">
                            <span
                                onClick={() => this.searchResults()}
                                className="input-group-text search-button" id="basic-text1">
                                    <i className="fa fa-search search-button-logo" aria-hidden="true"/>
                            </span>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(SearchBar);