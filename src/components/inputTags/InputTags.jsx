import React, { Component } from "react";
import { symptomOptions } from "./data";
import { default as ReactSelect } from "react-select";
import { components } from "react-select";
import styles from "./InputTags.module.css";
export let lista = [];

const Option = (props) => {
  if (props.isSelected && !lista.includes(props.label)) {
    lista.push(props.label);
  }
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />{" "}
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};

export default class Sintomas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionSelected: null,
    };
  }

  handleChange = (selected) => {
    this.setState({
      optionSelected: selected,
    });
  };

  render() {
    return (
      <span
        className="d-inline-block"
        data-toggle="popover"
        data-trigger="focus"
        //data-content="Please select account(s)" 
      >
        <ReactSelect
          options={symptomOptions}
          isMulti
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          components={{
            Option,
          }}
          onChange={this.handleChange}
          allowSelectAll={true}
          value={this.state.optionSelected}
          className={styles.inputsForm}
        />
      </span>
    );
  }
}
