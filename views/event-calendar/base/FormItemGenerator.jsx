import React from "react";
import propTypes from "prop-types";
import { Input, Form, Tooltip } from "antd";
import { FormattedMessage, intl } from "../translate/fake_react_intl";
import TitleGenerator from "./TitleGenerator";
import { useTranslation } from "../../../contexts/LocalizeContext";

/**
 * Form Item Generator
 * simplifica la creacion de inputs para los forms
 * @param {string} label Se escribe con las mayusculas necesarias, como si fuera la propiedad 'label'
 * @param {string} type declara la propiedad type dentro de rules
 * @param {object} style style sheet
 * @param {object} children en caso de necesitar algo distinto a un input, se utilizan los hijos para extender la funcionalidad
 */
const FormItemGenerator = ({
  className,
  label,
  name,
  type,
  children,
  handleChange,
  required,
  placeholder,
  value,
  state,
  message = "",
  max,
  pattern,
  block,
  isPassword = false,
  disabled = false,
  help = false,
  maxLength,
}) => {
  const { selectedLocale } = useTranslation();
  return (
    <Form.Item
      className={`label ${className}`}
      name={name || label.toLowerCase()}
      tooltip={help && help}
      label={<TitleGenerator id={label} required={required || false} />}
      rules={[
        {
          required: required || false,
          type: type || "any",
          message: message || <FormattedMessage id="isRequired" />,
          max: max || 300,
          pattern: pattern || "",
        },
      ]}
      initialValue={value}
      disabled={block || false}
    >
      {children ||
        (isPassword ? (
          <Input.Password
            className="input"
            value={state}
            placeholder={
              placeholder
                ? intl.formatMessage({ id: placeholder, selectedLocale })
                : intl.formatMessage({ id: "Password", selectedLocale })
            }
            onChange={(e) =>
              handleChange ? handleChange(e.target.value, name) : null
            }
          />
        ) : (
          <Input
            className="input"
            value={state}
            disabled={disabled}
            maxLength={maxLength && maxLength}
            placeholder={
              placeholder
                ? intl.formatMessage({ id: placeholder, selectedLocale })
                : intl.formatMessage({ id: "TextHere", selectedLocale })
            }
            onChange={(e) =>
              handleChange ? handleChange(e.target.value, name) : null
            }
          />
        ))}
    </Form.Item>
  );
};

FormItemGenerator.propTypes = {
  label: propTypes.string.isRequired,
};

export default FormItemGenerator;
