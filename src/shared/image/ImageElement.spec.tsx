import { fireEvent, render, screen } from "@testing-library/react";
import ImageElement from "./ImageElement";

describe("ImageElement", () => {
  it("should render image by provided src", () => {
    const src = `https://image.tmdb.org/t/p/w500/yueXS3q8BtoWekcHOATFHicLl3e.jpg`;
    const alt = `Alien Earth`;
    render(<ImageElement src={src} alt={alt} />);

    const initialImage = screen.getByRole("img");
    fireEvent.load(initialImage);

    screen.debug();

    expect(initialImage).toBeInTheDocument();
    expect(initialImage).toHaveAttribute("alt", alt);
  });

  it("should render fallback empty image on error", () => {
    const src = `https://image.tmdb.org/t/p/w500/fail.jpg`;
    const alt = `no image`;
    render(<ImageElement src={src} alt={alt} />);

    const initialImage = screen.getByRole("img");
    fireEvent.error(initialImage);
    const onErrorImage = screen.getByRole("img") as HTMLImageElement;

    screen.debug();

    expect(onErrorImage.src).toContain("/src/assets/empty.svg");
  });
});
