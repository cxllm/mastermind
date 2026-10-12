// The class for each row of the Board

import React from "react";
import Circle from "./Circle";
import Colours, { Colour } from "../types/Colour";

class Row extends React.Component<
	//typings
	{
		active: boolean;
		sequence: Colour[];
		id: number;
		submitRow: Function;
		colours: Colour[];
	},
	{
		active: boolean;
		colours: (Colour | undefined)[];
		count: Record<
			string,
			{ total: number; inArray: number; correctPlace: number }
		>;
		checked: boolean[][];
		rowIsFinished: boolean;
		Colours: Colour[];
		sequence: Colour[];
	}
> {
	constructor(props: any) {
		super(props);
		let count: Record<
			string,
			{ total: number; inArray: number; correctPlace: number }
		> = {};
		/* Creates a dictionary with each colour in so that if a colour is in the right place, 
		it is only shown as being in the right place for one of them, not both */
		for (let colour of Colours) {
			count[colour[0]] = { total: 0, inArray: 0, correctPlace: 0 };
		}
		// Global, modifiable properties
		this.state = {
			active: props.active,
			// Creates an empty array for the colours to be added to when the user submits them
			colours: Array(4).fill(undefined),
			count: count,
			checked: [],
			rowIsFinished: false,
			Colours: this.props.colours ?? Colours,
			sequence: this.props.sequence
		};
	}
	componentWillReceiveProps(nextProps: any, nextContext: any): void {
		// Update the sequence, colours and activity of the row when new values are possed
		this.setState({
			active: nextProps.active,
			Colours: nextProps.colours,
			sequence: nextProps.sequence
		});
	}
	render() {
		return (
			<>
				{/* the grid for the row */}
				<div className="grid">
					{/* the grid for guess entry */}
					<div className="grid">
						{this.state.colours.map((_, v) => {
							return (
								<Circle
									type="colour"
									active={this.state.active}
									id={v}
									// Passing through the method to set the colour to the Circle class
									setColour={this.setColour}
									// Passing through this method so that the right colours will be used according to user selected difficulty
									colours={this.state.Colours}
								/>
							);
						})}
					</div>
					{/* the grid for guess validation */}

					{this.state.active ? (
						// The actual button the submit your guesses
						<button
							className="submit"
							onClick={this.state.rowIsFinished ? this.submitRow : () => null}
							style={{
								cursor: this.state.rowIsFinished ? "pointer" : "no-drop",
								color: this.state.rowIsFinished ? "white" : "#fff7"
							}}
						>
							Submit
						</button>
					) : (
						<div className="grid">
							{this.state.colours.map((_, v) => {
								return (
									<Circle
										type="guess"
										active={this.state.active}
										id={v}
										// Passing through the method to check the colour to the Circle class (for the guess confirmation.)
										checkColour={this.checkColour}
									/>
								);
							})}
						</div>
					)}
				</div>{" "}
			</>
		);
	}
	submitRow = () => {
		// Set this row to inactive
		this.setState({ active: false });
		const sequence = this.state.sequence;
		const guess = this.state.colours as Colour[];
		// guesses[i] = [correctColourAndPlace, correctColourWrongPlace]
		const guesses: boolean[][] = guess.map(() => [false, false]);
		// How many of each colour in the sequence are still unmatched
		const remaining: Record<string, number> = {};
		// Pass 1: exact matches (right colour, right place). These are removed from the pool first
		for (let i = 0; i < sequence.length; i++) {
			if (guess[i][0] === sequence[i][0]) {
				guesses[i] = [true, true];
			} else {
				remaining[sequence[i][0]] = (remaining[sequence[i][0]] ?? 0) + 1;
			}
		}
		// Pass 2: right colour, wrong place. Each unmatched sequence peg can only be used once
		for (let i = 0; i < guess.length; i++) {
			if (guesses[i][0]) continue;
			if ((remaining[guess[i][0]] ?? 0) > 0) {
				remaining[guess[i][0]]--;
				guesses[i][1] = true;
			}
		}
		// update the state so the checkColour method will work
		this.setState({ checked: guesses });
		const won = guesses.every((g) => g[0]);
		this.props.submitRow(this.props.id, won);
	};
	// Sets the specific circle to a specific colour.
	setColour = (colour: Colour, circle: number) => {
		let arr = this.state.colours;
		arr[circle] = colour;
		this.setState({
			colours: arr
		});
		let rowIsFinished = true;
		for (let circle of arr) {
			if (circle === undefined) {
				rowIsFinished = false;
				break;
			}
		}
		if (rowIsFinished) {
			this.setState({ rowIsFinished });
		}
	};
	// Check if the colour is in the sequence and in the right place.
	checkColour = (circle: number): boolean[] => {
		return this.state.checked[circle] ?? [false, false];
	};
}

export default Row;
