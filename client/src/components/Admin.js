import React from 'react';
import { Paper } from 'material-ui';
import Switch from 'material-ui/Switch';
import { FormControlLabel, FormGroup } from 'material-ui/Form';

const parentSiteName = require('config').default.parentSiteName;
const logo = require('../images/logo.png');
const jQuery = require('jquery');

require('styles/Admin.scss');

class AdminComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      eps: props.eps,
      switches: []
    };
    this.apiEndpoint = props.apiEndpoint;
  }

  componentDidMount() {
    jQuery.ajax({
      url: `${this.apiEndpoint}/admin/getEpisodes`,
      xhrFields: { withCredentials: true },
      success: function(data) {
        let tempSwitches = this.state.eps.map(episode => {
          let foundElement = data.find(el => el.value === episode.guid);
          episode.checked = foundElement ? foundElement.enabled : false;
          episode.value = episode.guid;
          return episode;
        });
        this.setState({
          switches: tempSwitches
        });
      }.bind(this)
    });
  }

  renderSwitches() {
    return this.state.switches
      .map((el, index) =>
          <FormControlLabel
            control={
              <Switch
                checked={el.checked}
                value={el.value}
                onChange={this.handleClick.bind(this,index)}
              />
            }
            key={el.value}
            label={el.value}
          />
      );
  }

  handleClick(index) {
    let switches = this.state.switches;
    switches[index].checked = !switches[index].checked;
    this.setState({
      switches,
      foo: 'bazzz'
    }, () => {
      jQuery.ajax({
        type: 'POST',
        url: `${this.apiEndpoint}/admin/setEpisode`,
        xhrFields: { withCredentials: true },
        data: {
          guid: switches[index].guid,
          enabled: switches[index].checked
        }
      });
      this.forceUpdate()
    });
  }

  render() {
    return(
    <div>
      <Paper>
        <div className="hero-space">
          <div className="hero-content">
            <img src={logo} className="logo" alt={parentSiteName}/>
            <h2 className="tagline">Admin Panel</h2>
          </div>
        </div>
        <div className="content episodes">
          <h3 className="recent-episodes">Enable/Disable Episodes</h3>
            <FormGroup>
            {this.renderSwitches.call(this)}
            </FormGroup>
        </div>
      </Paper>
    </div>
    );
  }
}

export default AdminComponent;
