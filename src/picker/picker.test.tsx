import React from 'react';
import { render, cleanup, } from '@testing-library/react';
import { Picker, Calendar } from '..';
import '@testing-library/jest-dom/extend-expect';

test('renders learn react link', () => {
	const { getByText } = render(<Picker ><Calendar></Calendar></Picker>);
	
	expect(getByText('dd')).toBeInTheDocument();
});
