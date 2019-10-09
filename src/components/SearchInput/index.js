import React, { Component } from 'react';
import Script from 'react-load-script';

class SearchInput extends Component {
	// Define Constructor
	constructor(props) {
		super(props);

		// Declare State
		this.state = {
			city: '',
			query: ''
		};

		// Bind Functions
		this.handleScriptLoad = this.handleScriptLoad.bind(this);
		this.handlePlaceSelect = this.handlePlaceSelect.bind(this);
	}

	handleScriptLoad = (e) => {
		// Declare Options For Autocomplete
		var options = { types: [ '(regions)' ] };

		// Initialize Google Autocomplete
		/*global google*/
		const autocompleteAddressField = document.getElementById('autocomplete');
		this.autocomplete = new google.maps.places.Autocomplete(autocompleteAddressField, options);
		this.autocomplete.setComponentRestrictions({ country: [ 'CA' ] });

		// Fire Event when a suggested name is selected
		this.autocomplete.addListener('place_changed', this.handlePlaceSelect);
	};

	handlePlaceSelect() {
		// Extract City From Address Object
		let addressObject = this.autocomplete.getPlace();
		let address = addressObject.address_components;

		// Check if address is valid
		if (address) {
			// Set State
			this.setState({
				city: address[0].long_name,
				query: addressObject.formatted_address
			});
		}
	}

	handleChange = (e) => {
		this.setState({ locality: e.target.value });
	};

	render() {
		return (
			<div>
				<Script
					url={`https://maps.googleapis.com/maps/api/js?key=${process.env
						.REACT_APP_GOOGLE_PLACES_KEY}&libraries=places`}
					onLoad={this.handleScriptLoad}
				/>
				<input id="autocomplete" value={this.state.locality} onChange={this.handleChange} />
			</div>
		);
	}
}

export default SearchInput;
