import React, { Component } from 'react';
import { connect } from 'react-redux';
import Selector from '../components/Selector';
import { selectClipAction, controlClipAction } from '../actions';

const mapStateToProps = (state, ownProps) => ({
    clipActions: state.clipActions,
    currentClipActionId: state.currentClipActionId,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    selectClipAction: (id) => dispatch(selectClipAction(id)),
    controlClipAction: (feature) => dispatch(controlClipAction(feature)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Selector);