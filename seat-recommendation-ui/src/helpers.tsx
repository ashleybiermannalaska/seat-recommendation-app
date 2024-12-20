import React from "react";
import { SeatForUI as Seat, UserPreferences } from "../../types";

export function getMatchCount(seat: Seat, preferences: UserPreferences) {
  const totalPreferences = Object.keys(preferences).length;
  let matchCount = 0;

  if (seat.isWindow === preferences.windowSeat) matchCount++;
  if (seat.isAisle === preferences.aisleSeat) matchCount++;
  if (seat.hasExtraLegroom === preferences.extraLegroom) matchCount++;

  if (matchCount === totalPreferences) {
    return (
      <div className="perfect-match">
        Perfect match for your preferences!
      </div>
    );
  }
  return (
    <div>
      Satisfies {matchCount} of your {totalPreferences} preferences
    </div>
  );
}
