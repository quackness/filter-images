import React, { Component } from 'react';

class ItemInfo extends Component {

	constructor(props) {
		super(props);
	}

	printRating(rating) {
		var star = '<span alt="rating ' + rating + ' out of 5">';
		for (var i = 1; i <= 5; i++) {
			if (rating >= i) {
				star += '<img src="./images/star_Blue.png" width="15" height="15">';
			}
			else {
				star += '<img src="./images/star_Gray.png" width="15" height="15">';
			}
		}
		star += '</span>'
		return { __html: star };
	}

	render() {
		if (this.props.item != null) {
			var image = "./images/" + this.props.item.icon;
			var rating = this.props.item.rating;

			return (
				<div className="grid-result">
					<div className="grid-result-column">
						<img className="images" alt={this.props.item.name} src={image} />
					</div>

					<div className="grid-result-column">
						<div className="grid-result-header">
							<div className="grid-result-header-column">
								<div className="header-text black-text font">{this.props.item.name}</div>
							</div>
							<div className="grid-result-header-column">
								<span dangerouslySetInnerHTML={this.printRating(rating)} />
							</div>
						</div>

						<div className="small-text gray-text font">{this.props.item.description}</div>
					</div>

					<div className="grid-result-column">
						<div className="header-text black-text font">${this.props.item.price}</div>
						<button className="button">Add to Cart</button>
					</div>
				</div>
			)
		}
	}
}
export default ItemInfo;
