import { Component } from 'react';
import PropTypes from 'prop-types';
import c from './Searchbar.module.css';

export class Searchbar extends Component {
  state = {
    queryString: '',
  };

  handleInputChange = e => {
    this.setState({ queryString: e.currentTarget.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.queryString);
  };

  render() {
    const { queryString } = this.state;

    return (
      <header className={c.Searchbar}>
        <form onSubmit={this.handleSubmit} className={c.SearchForm}>
          <button type="submit" className={c.SearchFormButton}>
            <span className={c.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={c.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={queryString}
            onChange={this.handleInputChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
