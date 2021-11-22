import React, { Component } from "react";
import { symptomOptions } from "./data";
import { default as ReactSelect } from "react-select";
import { components } from "react-select";
import styles from "./InputTags.module.css";
export let lista = [];

const Option = (props) => {
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
    var arr = [];
    for (let index = 0; index < selected.length; index++) {
      arr.push(Object.values(selected[index])[0]);
    }
    lista = arr;

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
          placeholder="Selecciona o escribe los síntomas"
          value={this.state.optionSelected}
          className={styles.inputsForm}
          id={styles.InputFormEsp}
        />
      </span>
    );
  }
}
