// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import Header from 'grommet/components/Header';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';
import Footer from 'grommet/components/Footer';
import Search from 'grommet/components/Search';
import Section from 'grommet/components/Section';
import Box from 'grommet/components/Box';
import GrommetLogo from 'grommet/components/icons/Grommet';
import FavoriteLogo from 'grommet/components/icons/base/Favorite';
import PeopleIcon from './icons/PeopleIcon';
import GroupsIcon from './icons/GroupsIcon';
import LocationsIcon from './icons/LocationsIcon';
import config from '../config';

export default class Finder extends Component {

  constructor () {
    super();
    this._onScope = this._onScope.bind(this);
    this._onSearchDOMChange = this._onSearchDOMChange.bind(this);
  }

  componentDidMount () {
    this.refs.search.focus();
  }

  componentDidUpdate () {
    this.refs.search.focus();
  }

  _onScope (scope) {
    this.props.onScope(scope);
  }

  _onSearchDOMChange (event) {
    this.props.onSearch(event.target.value);
  }

  render () {
    let texture;
    let footer;
    let colorIndex = this.props.scope.colorIndex;
    const currentScope = this.props.scope.ou;
    let currentIcon = <PeopleIcon reverse={true} />;

    if (currentScope === 'groups') {
      currentIcon = <GroupsIcon reverse={true} />;
    } else if (currentScope === 'locations') {
      currentIcon = <LocationsIcon reverse={true} />;
    }

    // use a random background image
    const imageIndex = ((new Date()).getTime() % 4) + 1;

    if (this.props.initial) {
      texture = `url(img/people-finder-background-${imageIndex}.jpg)`;
      colorIndex = "neutral-1-a";
      footer = (
        <Footer float={true} colorIndex="grey-3-a"
          pad={{vertical: "small", horizontal: "medium", between: "medium"}} wrap={true} direction="row" justify="between" align="center">
          <Box pad={{vertical: "small", between: "small"}} align='center'
            direction="row">
            <GrommetLogo />
          </Box>
          <Box pad={{vertical: "small", between: "small"}} align='center'
            direction='row' responsive={false}>
            <span>Made with</span><FavoriteLogo /> <span>by the <a href="http://grommet.io" target="_blank">Grommet team</a></span>.
          </Box>
        </Footer>
      );
    }

    var scopeAnchors = Object.keys(config.scopes).map(key => {
      const scope = config.scopes[key];
      return (
        <Anchor key={key} onClick={this._onScope.bind(this, scope)}>
          <FormattedMessage id={scope.label} defaultMessage={scope.label} />
        </Anchor>
      );
    });

    return (
      <Section texture={texture} full={true} pad="none">
        <Header key="header" large={true}
          pad={{horizontal: "medium", between: "small"}}
          float={this.props.initial}
          colorIndex={colorIndex} splash={this.props.initial}
          responsive={false} justify="between">
          <Menu inline={false} icon={currentIcon}
            dropColorIndex={colorIndex}>
            {scopeAnchors}
          </Menu>
          <Box className="flex" direction="row" responsive={false}
            align="center" justify="end">
            <Search ref="search" inline={true} responsive={false} className="flex"
              placeHolder="Search"
              value={this.props.searchText}
              onDOMChange={this._onSearchDOMChange} />
          </Box>
        </Header>
        {this.props.children}
        {footer}
      </Section>
    );
  }

};

Finder.propTypes = {
  initial: PropTypes.bool.isRequired,
  onScope: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  scope: PropTypes.object.isRequired,
  searchText: PropTypes.string.isRequired
};

Finder.contextTypes = {
  intl: PropTypes.object.isRequired
};
