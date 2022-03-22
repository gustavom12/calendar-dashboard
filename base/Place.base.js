/* 
**
************************************************************************

how to use it?
1.- load the script
      import 
        import scriptMap from 'xxxx -> components/common/GooglePlacesInput/scriptMap'
      check  the script is ready 
        const [readyScript, setReadyScript] = useState(null)
        useEffect(() => {
          scriptMap(() => setReadyScript(true))
        }, [])
      
2.- render
      {readyScript && (
          <SearchPlaces
            address={addressMap}
            changeAddress={handleChangeAddress}
            selectAddress={handleSelectAddress}
          />
        )}

3.- props samples
        const [addressMap, setAddressMap] = useState(null)
        import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
          const handleChangeAddress = address => {
          setAddressMap(address)
          handleChange('address1', address)
        }

        const handleSelectAddress = address => {
          geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => console.log('Success', latLng))
            .catch(error => console.error('Error', error))
        }

************************************************************************
*/
import { Dropdown } from "antd";
import React from "react";
import PlacesAutocomplete from "react-places-autocomplete";

export default ({
  address,
  changeAddress,
  selectAddress,
  label,
  name,
  onChange,
}) => {
  const hadleChange = (a, b) => {
    onChange(a, b);
  };
  return (
    <PlacesAutocomplete
      value={address}
      onChange={changeAddress}
      onSelect={selectAddress}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div className="ant-row ant-form-item label">
          <div style={{ marginTop: "6px" }} />
          <Dropdown
            trigger={["click"]}
            overlay={
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion, key) => {
                  const className = suggestion.active
                    ? "suggestion-item--active"
                    : "suggestion-item";
                  const style = suggestion.active
                    ? { backgroundColor: "#fafafa", cursor: "pointer" }
                    : { backgroundColor: "#ffffff", cursor: "pointer" };
                  return (
                    <div
                      key={`suggestion${key}`}
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            }
          >
            <input
              onChange={hadleChange}
              id={name || ""}
              {...getInputProps({
                placeholder: () => {
                  label;
                },
                className: "input-b",
              })}
            />
          </Dropdown>
        </div>
      )}
    </PlacesAutocomplete>
  );
};
