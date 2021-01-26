import React, { Suspense } from 'react';
import { Lazy } from '@root/src/web/components/Lazy';

import {
	SignInGateComponent,
	CurrentABTest,
} from '@frontend/web/components/SignInGate/gateDesigns/types';
import {
	isNPageOrHigherPageView,
	isValidContentType,
	isValidSection,
	isIOS9,
	isValidTag,
} from '@frontend/web/components/SignInGate/displayRule';
import { initPerf } from '@root/src/web/browser/initPerf';
import { hasUserDismissedGateMoreThanCount } from '../dismissGate';

const SignInGateDesignOptVar5 = React.lazy(() => {
	const { start, end } = initPerf('SignInGateDesignOptVar5');
	start();
	return import(
		/* webpackChunkName: "SignInGateDesignOptVar5" */ '../gateDesigns/design-opt-test/SignInGateDesignOptVar5'
	).then((module) => {
		end();
		return { default: module.SignInGateDesignOptVar5 };
	});
});

const canShow = (
	CAPI: CAPIBrowserType,
	isSignedIn: boolean,
	currentTest: CurrentABTest,
): boolean =>
	!isSignedIn &&
	!hasUserDismissedGateMoreThanCount(
		currentTest.variant,
		currentTest.name,
		5,
	) &&
	isNPageOrHigherPageView(3) &&
	isValidContentType(CAPI) &&
	isValidSection(CAPI) &&
	isValidTag(CAPI) &&
	!isIOS9();

export const signInGateComponent: SignInGateComponent = {
	gate: ({
		ophanComponentId,
		dismissGate,
		guUrl,
		signInUrl,
		abTest,
		isComment,
	}) => (
		<Lazy margin={300}>
			<Suspense fallback={<></>}>
				<SignInGateDesignOptVar5
					ophanComponentId={ophanComponentId}
					dismissGate={dismissGate}
					guUrl={guUrl}
					signInUrl={signInUrl}
					abTest={abTest}
					isComment={isComment}
				/>
			</Suspense>
		</Lazy>
	),
	canShow,
};
