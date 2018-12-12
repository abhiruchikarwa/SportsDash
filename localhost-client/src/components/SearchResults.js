import React, { Component } from 'react'
import queryString from 'query-string'
import { withRouter } from 'react-router-dom';
import '../styles/search-results.styles.client.css'
import SearchService from "../services/SearchService";

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: "",
      term: "",
      searchResults: [],
    };
  }

  componentDidMount() {
    if (this.props.location && this.props.location.search) {
      const values = queryString.parse(this.props.location.search);
      SearchService.getSearchResults(values.filter, values.term)
        .then(results => this.setState({
          filter: values.filter,
          term: values.term,
          searchResults: results,
        }))
    }
  }

  render() {
    return (
      <div className="container search-results-container">
        <div className="row">
          <div className="col-md-2">
            <span className="back" onClick={() => this.props.history.push("/")}>
              <i className="fas fa-3x fa-chevron-left back-button" />
              <span className="back-text">Back</span>
            </span>
          </div>
          <div className="col-md-10">
            <p className="search-string"> Showing Results For <strong>{this.state.filter}</strong> with the
                            term <strong>{this.state.term}</strong></p>
          </div>
        </div>
        <div className="row result-box justify-content-center align-items-center">
          {
            this.state.searchResults.length === 0 ?
              <div className="row">
                <div className="col-md-12">
                  <p className="no-result-string"> Could not find any results for your search. Please
                                        change the search pattern and try again</p>
                </div>
              </div> :
              this.state.searchResults.map((element, index) =>
                <div key={index}
                  onClick={() => this.props.history.push('/details?filter=' + this.state.filter.toLowerCase() + '&id=' + element.api_id)}
                  className="card col-md-2 card-view-item shadow justify-content-center align-items-center">
                  <div
                    className="card-link justify-content-center align-items-center">
                    <div className="card-body align-items-center">
                      <p className="search-card-title">{element.name}</p>
                    </div>
                  </div>
                </div>
              )
          }
        </div>
      </div>
    );
  }
}

export default withRouter(SearchResults);