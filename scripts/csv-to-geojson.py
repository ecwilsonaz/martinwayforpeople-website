#!/usr/bin/env python3
"""Convert WSDOT crash CSV to GeoJSON for the SafetyMap component."""

import csv
import json
import sys

FATAL_SEVERITIES = {"Dead at Scene", "Dead on Arrival", "Died in Hospital"}

INPUT = "wsdot-martin-way-geocoded.csv"
OUTPUT = "public/data/crashes.geojson"


def convert():
    features = []
    skipped = 0

    with open(INPUT, newline="", encoding="utf-8") as f:
        for row in csv.DictReader(f):
            lat = row["Latitude"].strip()
            lng = row["Longitude"].strip()

            if not lat or not lng:
                skipped += 1
                continue

            try:
                lat_f = float(lat)
                lng_f = float(lng)
            except ValueError:
                skipped += 1
                continue

            severity = row["MostSevereInjuryType"].strip()
            full_date = row["FullDate"].strip()
            # Extract YYYY-MM-DD from ISO datetime like "2015-09-22T00:00:00"
            date = full_date[:10] if full_date else ""

            city = row["CityName"].strip() or row.get("_geo_city", "").strip()

            feature = {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [lng_f, lat_f],
                },
                "properties": {
                    "id": row["ColliRptNum"].strip(),
                    "date": date,
                    "time": row["FullTime"].strip(),
                    "year": int(row["_fetch_year"]),
                    "severity": severity,
                    "pedestrian": row["_is_pedestrian"].strip() == "1",
                    "fatal": severity in FATAL_SEVERITIES,
                    "city": city,
                    "address": row["_geo_address"].strip(),
                },
            }
            features.append(feature)

    # Sort by date for consistent output
    features.sort(key=lambda f: (f["properties"]["date"], f["properties"]["time"]))

    geojson = {"type": "FeatureCollection", "features": features}

    with open(OUTPUT, "w", encoding="utf-8") as f:
        json.dump(geojson, f, separators=(",", ":"))

    print(f"Wrote {len(features)} features to {OUTPUT}")
    if skipped:
        print(f"Skipped {skipped} rows (missing/invalid coordinates)")


if __name__ == "__main__":
    convert()
