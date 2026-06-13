from pathlib import Path

page_path = Path('src/pages/index.astro')
lines = page_path.read_text().splitlines()

if not any('data-home-services-hub' in line for line in lines):
    services_start = next(
        index for index, line in enumerate(lines) if 'id="services"' in line
    )
    services_end = next(
        index
        for index in range(services_start + 1, len(lines))
        if lines[index] == '    </Section>'
    )
    lines[services_end:services_end] = [
        '      <div class="mt-8">',
        '        <Button',
        '          href="/services"',
        '          variant="secondary"',
        '          size="lg"',
        '          data-home-services-hub',
        '        >',
        '          View All Services',
        '        </Button>',
        '      </div>',
    ]

if not any('data-home-service-areas-hub' in line for line in lines):
    areas_start = next(
        index for index, line in enumerate(lines) if 'id="service-areas"' in line
    )
    link_grid_start = next(
        index
        for index in range(areas_start + 1, len(lines))
        if '<LinkGrid' in lines[index]
    )
    intro_end = max(
        index
        for index in range(areas_start + 1, link_grid_start)
        if lines[index].strip() == '</div>'
    )
    lines[intro_end:intro_end] = [
        '          <Button',
        '            href="/service-areas"',
        '            variant="secondary"',
        '            class="mt-6"',
        '            data-home-service-areas-hub',
        '          >',
        '            Explore All Service Areas',
        '          </Button>',
    ]

page_path.write_text('\n'.join(lines) + '\n')
