# Effective Code Sharing in React Native with Monorepo Architecture

Have you ever wondered if there's a better way to manage your React Native projects that are built for both web and native platforms? Have you struggled with managing multiple repositories, keeping them in sync, and ensuring consistency across your codebase?

Well, you're not alone. What if I told you there's a solution that can help you overcome these challenges and improve your development process?

Enter React Native Monorepo. By using a monorepo architecture, you can streamline your project management, improve collaboration, and make your life easier.

Google's Urs Hölzle stated:

> Monorepos are great because they encourage collaboration, reduce duplication, and make it easier to move code between projects

I'm here to share with you my recent experience of building a project in React Native Monorepo setup.

## Who is using monorepo?

* According to a 2018 survey by GitHub, more than 70% of organizations with over 1000 employees are using monorepos.
    
* Google, one of the largest tech companies in the world, uses a monorepo for its entire codebase and has reported that it reduces build times by 50% and speeds up the development process.
    
* Facebook, another tech giant, uses a monorepo for its codebase and has seen significant improvements in code sharing and collaboration, with over 90% of its engineers using a single codebase.
    
* Airbnb has reported that using a monorepo has reduced their build time from several hours to just a few minutes.
    
* Uber has also adopted monorepo and has seen improvements in the speed and reliability of its builds, as well as better code sharing and collaboration among its engineers.
    

These figures demonstrate the benefits of using monorepo for managing large codebases and the growing popularity of this architecture among tech companies.

## How monorepo architecture works?

In monorepo architecture, you have only one that contains multiple projects, in our case, it's a React.js and a React Native project.

By default, projects in Node.js cannot import dependencies from outside of their root folder. However, in a monorepo, you can configure the project structure in a way that allows both the React.js and React Native projects to access a shared node\_modules folder at the root of the monorepo.

This is achieved through the use of **symbolic links**.

> A **symbolic link** is a special type of file that acts as a shortcut to another file or directory

In a React Native Monorepo, you can create symbolic links from the `node_modules` folders in each project to the shared `node_modules` folder at the root of the monorepo. This way, when the projects import dependencies, they can access the shared `node_modules` folder and all the packages stored there.

## Benefits of using monorepo architecture

If you've read so far, you might have already concluded the following benefits which we'll get out of the box in a monorepo architecture:

* **Reduced duplication:** By sharing a single node\_modules folder, you reduce the amount of disk space used by multiple copies of the same package.
    
* **Consistency:** With a shared node\_modules folder, both projects are using the same versions of packages, reducing the risk of inconsistencies and compatibility issues.
    
* **Improved collaboration:** With the ability to share code and dependencies, developers can collaborate more effectively on the projects, making it easier to develop and maintain the code.
    
* **Increased efficiency:** With a monorepo, developers can work on multiple projects at once, reducing the time and effort required to switch between projects.
    
* **Improved code sharing:** By keeping all projects in one repository, it's easier to share code and components between projects, making it easier to reuse code and improve code consistency.
    
* **Better code organization:** With a monorepo, it's easier to keep all your code in one place, making it easier to find and manage code.
    
* **Simplified version control:** With all projects in one repository, it's easier to manage version control and keep track of changes to the code.
    

## Monorepo vs Monolith: Understanding the Difference

It's common to confuse a monorepo with a monolith, but they are not the same thing. While a monorepo is a single repository that contains multiple projects, a monolith is a large, tightly-coupled software system. In monolith, all of the code and dependencies are bundled together, making it difficult to change or modify individual components.

In contrast, a monorepo is built for greater flexibility and modularity. By dividing the codebase into separate projects, it's possible to manage dependencies, isolate changes, and make modifications without affecting the rest of the codebase.

Additionally, a monorepo does not necessarily mean a monolithic architecture. The projects within a monorepo can be structured in a modular fashion, allowing for greater scalability and flexibility. By properly managing the dependencies and structure of the projects within a monorepo, it's possible to create a scalable and flexible codebase that can adapt to changing requirements over time.

## Module Boundaries in a Monorepo Architecture

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1676194505918/261bdcef-93eb-43dc-9f75-b327bcbd072c.webp align="center")

Module boundaries are a key aspect of managing a monorepo architecture. They define the boundaries between different parts of the codebase and help to maintain separation between projects and dependencies. This can help to ensure that changes to one project do not impact other projects in the monorepo, and that each project can be developed and maintained independently.

In a monorepo architecture, modules are typically defined by their directory structure and package.json file.

Each project has its own directory and its own set of dependencies, which are declared in its package.json file.

When a project needs to use a dependency from another project in the monorepo, it can reference it through a symbolic link. This allows the project to access the dependency while maintaining a clear separation between the projects.

Module boundaries also help to enforce modular design principles, such as the separation of concerns and single responsibility. By dividing the codebase into smaller, more manageable modules, it's easier to create a clear and modular design that is scalable and flexible. A video demonstration is available on [NX Youtube Channel](https://www.youtube.com/watch?v=Fj18Y1uq0pQ)

In addition, module boundaries can help to improve build times, as each project can be built independently. This means that changes to one project do not require a full rebuild of the entire codebase, which can save time and improve efficiency.

## Tools available for Monorepo Architecture

![](https://i.ytimg.com/vi/hCm373Aq1uQ/maxresdefault.jpg align="left")

There are several tools available that can help manage monorepo architecture, including:

[Nx Workspace:](https://nx.dev/) Nx is a powerful platform for developing and managing monorepos, with a focus on modern web development. It supports multiple projects and libraries in a single workspace, and provides a set of tools and plugins for building, testing, and deploying applications.

[Lerna:](https://lerna.js.org/) Lerna is a popular open-source tool for managing monorepos, designed to help teams scale their projects and maintain a high degree of consistency and collaboration. It supports the versioning and publishing of packages, and provides tools for managing dependencies and managing releases.

[Yarn Workspaces:](https://classic.yarnpkg.com/lang/en/docs/workspaces/) Yarn Workspaces is a feature of the Yarn package manager that allows multiple projects to share a single node\_modules directory. This can simplify dependencies management and improve performance by reducing the number of packages that need to be installed and maintained.

These tools can be used to manage monorepo architecture, but each has its own strengths and weaknesses. Choosing the right tool will depend on the specific needs of your project and team, so it's important to research and compare the options before making a decision.

## How code is shared across multiple projects in Nx Workspace?

In an Nx Workspace, code sharing across multiple projects is achieved through the use of libraries. Libraries are collections of reusable code, functions, components, or services that can be imported and used by multiple applications within the workspace.

The directory structure of an Nx Workspace is organized in a way that makes it easy to manage multiple projects and libraries.

The basic structure of an Nx Workspace would look something like this:

```javascript
my-workspace/
|-- apps/
|   |-- react-js/
|   |   |-- src/
|   |   |-- ...
|   |-- react-native/
|   |   |-- src/
|   |   |-- ...
|-- libs/
|   |-- button/
|   |   |-- src/
|   |   |-- ...
|-- tools/
|-- ...
```

In above structure, we've an Nx workspace named `myworkspace`.

We have two applications: a React.js app under the `apps/react-js` directory and a React Native app under the `apps/react-native` directory.

Each application has its own `src` directory where the main source code resides.

In addition, there is a `libs` directory where libraries are stored. In this case, we have a `button` library, which contains a simple React component.

The `tools` directory is where any additional tools or scripts required by the workspace are stored.

Now consider a simple React component that displays a `Button`. This component can be packaged as a library and shared across both React.js and React Native projects within the Nx Workspace.

For instance, here's our simple button component in react native:

```javascript
import { TouchableOpacity, Text } from 'react-native'

const Button = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <Text>{props.label}</Text>
        </TouchableOpacity>
    );
};

export default Button;
```

To use the button component in a React.js project, you would import it as follows:

```javascript
import { Button } from '@myworkspace/libs';

function App() {

  const onPressBtn = () => {
     navigate("LoginPage")
  } 

  return (
    <div>
      <Button onPress={onPressBtn} label="Goto Login Page"/>
    </div>
  );
}

export default App;
```

In a React Native project also, you would similarly use the button component:

```javascript
import React from 'react';
import { View } from 'react-native';
import { Button } from '@myworkspace/libs';

function App() {

  const onPressBtn = () => {
     navigate("LoginScreen")
  } 

  return (
    <View>
      <Button onPress={onPressBtn} label="Goto Login Screen"/>
    </View>
  );
}

export default App;
```

I hope this article has provided a good introduction to Nx Workspaces and how they can be used to share code across multiple projects. 🙌🏻

If you're interested in learning more about advanced software development techniques, be sure to follow my [newsletter](https://hamzawaleed.com/newsletter) for quality content. You'll receive regular updates on the latest trends, tools, and best practices, as well as exclusive access to new content and resources. ✅