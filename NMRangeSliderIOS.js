import React, { Text, ColorPropType } from 'react-native';

const requireNativeComponent =  require('react-native').requireNativeComponent;
const NMRangeSliderIOS = React.createClass({
  propTypes: {
    minimumValue: React.PropTypes.number,
    maximumValue: React.PropTypes.number,
    lowerValue: React.PropTypes.number,
    lowerMaximumValue: React.PropTypes.number,
    upperValue: React.PropTypes.number,
    upperMinimumValue: React.PropTypes.number,
    minimumRange: React.PropTypes.number,
    stepValue: React.PropTypes.number,
    stepValueContinuously: React.PropTypes.bool,
    continuous: React.PropTypes.bool,
    lowerCenter: React.PropTypes.object, // CGPoint?
    upperCenter: React.PropTypes.object, // CGPoint?
    onChange: React.PropTypes.func,
    trackColor: ColorPropType,
    trackColorBackground: ColorPropType,
    trackThickness: React.PropTypes.number,
    disabled: React.PropTypes.bool,
  },

  getDefaultProps() {
    return {
      trackColor: '#4A90E2',
      trackColorBackground: '#AAAAAA',
      trackThickness: 2,
    }
  },

  componentDidMount() {
    this.setState({...this.props});
  },

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
  },

  convertNativeEvent(event) {
    return [
      parseInt(event.nativeEvent.lowerValue, 10),
      parseInt(event.nativeEvent.upperValue, 10),
    ];
  },

  _onChange: function(event) {
    if (!this.props.onChange) {
      return;
    }
    this.props.onChange(this.convertNativeEvent(event));
  },

  render: function() {
    return (
      <NMRangeSlider
        {...this.props}
        lowerValue={0}
        upperValue={0}
        disabled={false}
        {...this.state}
        onChange={this._onChange}
      />
    )
  }
});

const NMRangeSlider = requireNativeComponent('NMRangeSlider', NMRangeSliderIOS, {
  nativeOnly: {
    onChange: true,
  },
});

module.exports = NMRangeSliderIOS;
