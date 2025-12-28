import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
    width: 32,
    height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 24,
                    background: 'transparent',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#E50914', // Netflix Red
                }}
            >
                {/* Simple Camera Icon using text/emoji or SVG path if preferred. 
           Using a simple SVG path for a crisp look */}
                <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M15 12V8H5V16H15V12ZM15 6C15.5523 6 16 6.44772 16 7V10.5L20 6.5V17.5L16 13.5V17C16 17.5523 15.5523 18 15 18H5C4.44772 18 4 17.5523 4 17V7C4 6.44772 4.44772 6 5 6H15ZM6.5 10C6.5 10.8284 7.17157 11.5 8 11.5C8.82843 11.5 9.5 10.8284 9.5 10C9.5 9.17157 8.82843 8.5 8 8.5C7.17157 8.5 6.5 9.17157 6.5 10ZM13.5 10C13.5 10.8284 12.8284 11.5 12 11.5C11.1716 11.5 10.5 10.8284 10.5 10C10.5 9.17157 11.1716 8.5 12 8.5C12.8284 8.5 13.5 9.17157 13.5 10Z" />
                </svg>
            </div>
        ),
        {
            ...size,
        }
    );
}
