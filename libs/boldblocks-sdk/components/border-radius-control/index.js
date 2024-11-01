/**
 * External dependencies
 */
import { noop, map, pick } from "lodash";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { __experimentalUnitControl as UnitControl } from "@wordpress/components";

/**
 * Internal dependencies
 */
import { LabelControl } from "../label-control";
import { UnitRangeControl } from "../unit-range-control";
import { BorderRadiusControlStyled } from "./styles";
import { isAllEqual } from "../../utils";

/**
 * Border radius control
 *
 * @param {Object}
 * @returns
 */
export const BorderRadiusControl = ({
  label,
  values,
  onChange = noop,
  fields = [
    { name: "top-left", label: "", placeholder: "top-left" },
    { name: "top-right", label: "", placeholder: "top-right" },
    { name: "bottom-right", label: "", placeholder: "bottom-right" },
    { name: "bottom-left", label: "", placeholder: "bottom-left" },
  ],
  ...otherProps
}) => {
  const getInitialLinkedState = (values) => {
    const valueByFields = fields.map(({ name }) => values[name] ?? "");
    return isAllEqual(valueByFields);
  };

  return (
    <>
      <BorderRadiusControlStyled
        label={label}
        fields={fields}
        values={values}
        renderLabel={({ label, isResponsive = true }) => {
          return (
            <LabelControl
              label={label}
              isResponsive={isResponsive}
              isBold={true}
            />
          );
        }}
        renderControl={({
          label,
          value,
          onChange,
          placeholder,
          ...otherProps
        }) => (
          <UnitControl
            placeholder={placeholder}
            label={label}
            value={value}
            onChange={onChange}
            {...otherProps}
          />
        )}
        renderAllControl={({
          value,
          fields,
          values,
          onChange,
          ...otherProps
        }) => {
          const fieldNames = map(fields, "name");
          const radiusValues = pick(values, fieldNames);

          let allPlaceholder = isAllEqual(Object.values(radiusValues))
            ? ""
            : __("Mixed");
          if (allPlaceholder) {
            value = "";
          }
          return (
            <UnitRangeControl
              hideLabelFromVision
              placeholder={allPlaceholder}
              value={value}
              onChange={onChange}
              {...otherProps}
            />
          );
        }}
        isLinkedGroup={true}
        getInitialLinkedState={getInitialLinkedState}
        onChange={onChange}
        columns={2}
        {...otherProps}
      />
    </>
  );
};
