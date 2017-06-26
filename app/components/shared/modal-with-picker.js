import React, { PropTypes } from 'react';
import { Modal, Picker } from 'react-native';


const ModalWithPicker = props => (
  <Modal
    animationType={'slide'}
    transparent={false}
    visible={props.visible}
  >
    <Picker
      selectedValue={props.selectedValue}
      onValueChange={(itemValue) => {
        props.handlePickerSelect(itemValue);
        props.toggleVisible(!props.visible);
      }}
    >
      <Picker.Item label="Alphabetical" value="Alphabetical" />
      <Picker.Item label="Reverse Alphabetical" value="Reverse Alpha" />
      <Picker.Item label="Most Recent" value="Recent" />
      <Picker.Item label="Least Recent" value="Least Recent" />
      <Picker.Item label="Most Popular" value="Popular" />
      <Picker.Item label="Least Popular" value="Least Popular" />
    </Picker>
  </Modal>
);


ModalWithPicker.propTypes = {
  visible: PropTypes.bool.isRequired,
  handlePickerSelect: PropTypes.func.isRequired,
  toggleVisible: PropTypes.func.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default ModalWithPicker;
