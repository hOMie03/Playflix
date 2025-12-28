export function srtToWebvtt(srtContent: string): string {
    // Simple SRT to WebVTT converter
    let vtt = "WEBVTT\n\n";

    // Normalize line endings
    const normalized = srtContent.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

    // Split into blocks
    const blocks = normalized.split('\n\n');

    blocks.forEach(block => {
        const lines = block.split('\n');
        if (lines.length >= 2) {
            // Check if first line is index or timing
            let timingLineIndex = 0;
            if (lines[0].match(/^\d+$/)) {
                timingLineIndex = 1;
            }

            const timingLine = lines[timingLineIndex];
            // SRT timing: 00:00:20,000 --> 00:00:24,400
            // VTT timing: 00:00:20.000 --> 00:00:24.400
            if (timingLine && timingLine.includes('-->')) {
                const vttTiming = timingLine.replace(/,/g, '.');
                vtt += vttTiming + '\n';

                // Add text lines
                for (let i = timingLineIndex + 1; i < lines.length; i++) {
                    vtt += lines[i] + '\n';
                }
                vtt += '\n';
            }
        }
    });

    return vtt;
}
