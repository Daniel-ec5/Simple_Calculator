# Calculator Web App
A dark-themed calculator built with HTML, CSS, and JavaScript. It performs basic arithmetic operations and provides a clean, responsive user interface. Designed with smart behaviors like auto-bracket management, decimal prevention, and live result updates.

 ## Features
Perform addition, subtraction, multiplication, and division

Handles brackets intelligently with auto-closing

Prevents invalid inputs like multiple decimals in a single number

Live calculation preview using MutationObserver

Backspace and clear buttons for easy editing

Responsive dark-mode UI with hover effects

Smart multiplication insertion (e.g., 2(3+4) auto-inserts *)

Error alerts for overly long calculations (>30 characters)

## Technologies Used
HTML5 for structure

CSS3 for styling (with custom dark theme)

JavaScript (ES6) for interactive functionality

##  Usage
Click the number and operator buttons to enter your calculation.

Use C to clear the input or the backspace icon to delete the last character.

Click = to compute the result.

The calculator automatically evaluates partial expressions for a live preview.

##  How to Run Locally
Clone the repository:

### git clone https://github.com/Daniel.ec5/Simple_Calculator.git

Navigate to the project folder:
cd calculator
Open index.html in your browser:
open index.html
(or double-click it on Windows)

## Known Issues
Using long expressions (>30 characters) triggers an alert.

This calculator currently uses eval() for calculations, which is not recommended for production.


#####  i know i could have used the maths.js evaluation function that is easier and safer, but needed this to also handle the plain eval edge cases. No edge case is for the weak.(just kidding, please use maths.js in production)





