# Six-City Image Candidate Reference

> Reference package for GitHub issue #57. These files are candidate references only.
> Do not publish an image until its exact author, license, commercial-use permission,
> derivative/crop permission, attribution, and human approval are recorded.

City-context images must not be presented as CFL Wash Co. project proof, completed work,
or municipal endorsement.

## Candidate overview

| City | Candidate subject | Rights status |
|---|---|---|
| Deltona | Deltona City Hall | Exact Commons license review pending |
| Orange City | Orange City Town Hall | CC BY 3.0 verified; human visual approval pending |
| DeBary | DeBary Hall | CC BY-SA 3.0 selected; human visual approval pending |
| DeLand | Athens Theatre, Downtown DeLand Historic District | CC BY 2.5 candidate selection; human visual approval pending |
| Sanford | Sanford City Hall | Exact Commons license review pending |
| Lake Mary | Lake Mary City Hall | Exact Commons license review pending |

## 1. Deltona — Deltona City Hall

![Deltona City Hall candidate](https://commons.wikimedia.org/wiki/Special:Redirect/file/Deltona_city_hall_deltona_florida.jpg?width=1200)

- Commons source: <https://commons.wikimedia.org/wiki/File:Deltona_city_hall_deltona_florida.jpg>
- Original download target: <https://commons.wikimedia.org/wiki/Special:Redirect/file/Deltona_city_hall_deltona_florida.jpg>
- Proposed reference filename: `deltona-city-hall.jpg`
- Status: `license-review`
- Before publication: verify exact author, license, attribution wording, commercial reuse, and derivative/crop rights.

## 2. Orange City — Orange City Town Hall

![Orange City Town Hall candidate](https://commons.wikimedia.org/wiki/Special:Redirect/file/Orange_city_town_hall_orange_city_florida.jpg?width=1200)

- Commons source: <https://commons.wikimedia.org/wiki/File:Orange_city_town_hall_orange_city_florida.jpg>
- Original download target: <https://commons.wikimedia.org/wiki/Special:Redirect/file/Orange_city_town_hall_orange_city_florida.jpg>
- Proposed reference filename: `orange-city-town-hall.jpg`
- Author: Connor J. Williams
- Source: Own work, 2025
- License: CC BY 3.0
- Proposed attribution: `Photo: Connor J. Williams, CC BY 3.0, via Wikimedia Commons. Cropped and optimized.`
- Status: `license-verified-candidate`
- Human subject/crop approval is still required.

## 3. DeBary — DeBary Hall

![DeBary Hall candidate](https://commons.wikimedia.org/wiki/Special:Redirect/file/DeBary_Hall1.jpg?width=1200)

- Commons source: <https://commons.wikimedia.org/wiki/File:DeBary_Hall1.jpg>
- Original download target: <https://commons.wikimedia.org/wiki/Special:Redirect/file/DeBary_Hall1.jpg>
- Proposed reference filename: `debary-hall.jpg`
- Author: Ebyabe / John Bradley
- Source: Own work
- Selected license: CC BY-SA 3.0
- Proposed attribution: `Photo: Ebyabe (John Bradley), CC BY-SA 3.0, via Wikimedia Commons. Cropped and optimized.`
- Share-alike obligations must be preserved for derivatives.
- Status: `license-verified-candidate`
- Human subject/crop approval is still required.

## 4. DeLand — Athens Theatre

![Athens Theatre candidate](https://commons.wikimedia.org/wiki/Special:Redirect/file/Downtown_DeLand_Hist_Dist_-_Athens_Theatre.jpg?width=1200)

- Commons source: <https://commons.wikimedia.org/wiki/File:Downtown_DeLand_Hist_Dist_-_Athens_Theatre.jpg>
- Original download target: <https://commons.wikimedia.org/wiki/Special:Redirect/file/Downtown_DeLand_Hist_Dist_-_Athens_Theatre.jpg>
- Proposed reference filename: `deland-athens-theatre.jpg`
- Author: Ebyabe / John Bradley
- Source: Own work
- Candidate selected license: CC BY 2.5
- Proposed attribution: `Photo: Ebyabe (John Bradley), CC BY 2.5, via Wikimedia Commons. Cropped and optimized.`
- Confirm the final selected license on the Commons file page before publication.
- Status: `license-verified-candidate`
- Human subject/crop approval is still required.

## 5. Sanford — Sanford City Hall

![Sanford City Hall candidate](https://commons.wikimedia.org/wiki/Special:Redirect/file/Sanford_City_Hall_FL.jpg?width=1200)

- Commons source: <https://commons.wikimedia.org/wiki/File:Sanford_City_Hall_FL.jpg>
- Original download target: <https://commons.wikimedia.org/wiki/Special:Redirect/file/Sanford_City_Hall_FL.jpg>
- Proposed reference filename: `sanford-city-hall.jpg`
- Status: `license-review`
- Before publication: verify exact author, license, attribution wording, commercial reuse, and derivative/crop rights.

## 6. Lake Mary — Lake Mary City Hall

![Lake Mary City Hall candidate](https://commons.wikimedia.org/wiki/Special:Redirect/file/LakeMaryCityHall2026.jpg?width=1200)

- Commons source: <https://commons.wikimedia.org/wiki/File:LakeMaryCityHall2026.jpg>
- Original download target: <https://commons.wikimedia.org/wiki/Special:Redirect/file/LakeMaryCityHall2026.jpg>
- Proposed reference filename: `lake-mary-city-hall.jpg`
- Status: `license-review`
- Before publication: verify exact author, license, attribution wording, commercial reuse, and derivative/crop rights.

## Local workflow

From the repository root, run:

```bash
bash scripts/download-city-image-candidates.sh
```

The originals will be downloaded to:

```text
docs/design/city-image-candidates/originals/
```

After review:

1. Verify all six exact license records.
2. Record human approval.
3. Reject or replace any unsuitable candidate.
4. Strip EXIF/GPS from public derivatives.
5. Optimize/crop only after derivative rights are confirmed.
6. Do not publish these original reference files directly.
