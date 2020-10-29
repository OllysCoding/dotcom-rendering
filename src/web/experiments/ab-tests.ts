import { ABTest } from '@guardian/ab-core';
import { abTestTest } from '@frontend/web/experiments/tests/ab-test-test';
import { signInGateMainVariant } from '@root/src/web/experiments/tests/sign-in-gate-main-variant';
import { signInGateMainControl } from '@root/src/web/experiments/tests/sign-in-gate-main-control';
import { curatedContainerTest } from '@frontend/web/experiments/tests/curated-container-test';
import { newsletterMerchUnit } from './tests/newsletter-merch-unit-test';

export const tests: ABTest[] = [
    abTestTest,
    signInGateMainVariant,
    signInGateMainControl,
    curatedContainerTest,
    newsletterMerchUnit,
];
