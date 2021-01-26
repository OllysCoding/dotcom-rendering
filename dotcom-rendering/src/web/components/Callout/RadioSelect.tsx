import React from 'react';
import { css } from 'emotion';

import { RadioGroup, Radio } from '@guardian/src-radio';
import { FieldLabel } from './FieldLabel';

type fieldProp = {
	formField: CampaignFieldRadio;
	formData: { [key in string]: any };
	setFormData: React.Dispatch<React.SetStateAction<{ [x: string]: any }>>;
};

export const RadioSelect = ({
	formField,
	formData,
	setFormData,
}: fieldProp) => (
	// work around to enforce `display: flex;` to `RadioGroup`'s fieldset tag
	// https://github.com/guardian/source/issues/580
	<div
		className={css`
			fieldset {
				display: flex;
			}
		`}
	>
		<FieldLabel formField={formField} />
		<RadioGroup
			name={formField.name}
			orientation={
				formField.options.length > 2 ? 'vertical' : 'horizontal'
			}
		>
			{formField.options.map((option, index) => {
				const isRadioChecked =
					formField.id in formData &&
					formData[formField.id] === option.value;
				return (
					<Radio
						data-testid={`form-field-${option.value}`}
						key={index}
						label={option.label}
						value={option.value}
						name={`${formField.id}`}
						checked={!!isRadioChecked}
						onClick={() =>
							setFormData({
								...formData,
								[formField.id]: option.value,
							})
						}
					/>
				);
			})}
		</RadioGroup>
	</div>
);
