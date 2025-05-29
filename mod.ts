import { run, annotate, Icons } from "pierre";

export const Job =
  ({
    project,
    service,
    environment,
    token,
  }: {
    project?: string;
    service?: string;
    environment?: string;
    token?: string;
  } = {}): (() => void) =>
  async () => {
    const railway = "./node_modules/.bin/railway";
    if (project)
      await run(`RAILWAY_TOKEN=${token} ${railway} link -p "${project}"`);
    await run(
      `RAILWAY_TOKEN=${token} ${railway} up -c -s "${service}" -e "${environment}"`,
    );
    annotate({
      icon: Icons.App,
      color: "fg",
      label: "Railway Service",
      href: `https://railway.app/project/${project}/service/${service}?environmentId=${environment}`,
    });
  };
