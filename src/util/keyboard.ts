import React from 'react';

export function isModifierKeyPressed(e: React.KeyboardEvent): boolean {
	return e.altKey || e.ctrlKey || e.shiftKey || e.metaKey;
}

export function isTriggered(e: React.KeyboardEvent): boolean {
	return e.key === ' ' || e.key === 'Enter';
}
